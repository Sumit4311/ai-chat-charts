import React, { useState } from 'react';
import { 
  Box,
  IconButton,
  Paper,
  Select,
  MenuItem,
  Typography,
  InputBase,
  Button,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import RefreshIcon from '@mui/icons-material/Refresh';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [model, setModel] = useState('free');
  const [inputValue, setInputValue] = useState('');
  const [tool, setTool] = useState(null);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(Date.now());
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartData, setChartData] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://ai.solcon.instagrp.in/api/v1/';
  const handleSend = async () => {
  if (!inputValue.trim()) return;

  const userMessage = {
    sender: 'user',
    text: inputValue,
    role: 'user',
    sessionId: currentSessionId,
  };
  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setInputValue('');
  setLoading(true);

  try {
    let endpoint = 'query';
    if (tool === 'chart') endpoint = 'query/chart';
    else if (tool === 'table') endpoint = 'query/table';
    else if (tool === 'document') endpoint = 'query/document';

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userMessage.text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    let formattedChartData = null;

    if (tool === 'chart' && data?.data?.data) {
      let items = data.data.data;

      if (Array.isArray(items) && items.length && items[0].column && items[0].value) {
        const rows = [];
        let row = {};
        items.forEach((item) => {
          if (item.column === 'id' && Object.keys(row).length > 0) {
            rows.push(row);
            row = {};
          }
          row[item.column] = item.value;
        });
        if (Object.keys(row).length > 0) rows.push(row);

        const labels = rows.map(r => r.quarter).filter(Boolean);
        const values = rows.map(r => Number(r.revenue)).filter((v, i) => labels[i]);
        if (labels.length && values.length) {
          formattedChartData = { labels, values };
        }
      }

      else if (Array.isArray(items) && typeof items[0] === 'object') {
        const labels = items.map(r => r.quarter).filter(Boolean);
        const values = items.map(r => Number(r.revenue)).filter((v, i) => labels[i]);
        if (labels.length && values.length) {
          formattedChartData = { labels, values };
        }
      }
}
    if (!formattedChartData && data?.chartData?.labels && data?.chartData?.values) {
      const { labels, values } = data.chartData;
      formattedChartData = { labels, values };
    }

    const botMessage = {
      sender: 'bot',
      text:
        typeof data?.answer === 'string' ? data.answer :
        typeof data?.response === 'string' ? data.response :
        typeof data?.data === 'string' ? data.data :
        typeof data?.message === 'string' ? data.message :
        JSON.stringify(data),
      chartData: tool === 'chart' ? (formattedChartData || data?.chartData || null) : null,
      role: 'bot',
      sessionId: currentSessionId,
    };
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error('Error fetching response from API:', error);
    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: 'Please try again.',
        role: 'bot',
        sessionId: currentSessionId,
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  const renderChart = (chartData) => {
  if (!chartData?.labels || !chartData?.values) return null;

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Data',
        data: chartData.values,
        backgroundColor: '#3f51b5',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
      },
      y: {
        ticks: { color: 'white' },
      },
    },
  };
  return <Bar data={data} options={options} />;
};

  const generateTitleFromMessages = (msgs) => {
    const userMsg = msgs.find(msg => msg.role === 'user');
    if (!userMsg) return 'New Chat';
    return userMsg.text.length > 25 ? userMsg.text.slice(0, 25) + '...' : userMsg.text;
  };

  const handleNewChat = () => {
    const sessionMessages = messages.filter(msg => msg.sessionId === currentSessionId);
    if (sessionMessages.length > 0) {
      const title = generateTitleFromMessages(sessionMessages);
      setChatSessions(prev => [
        ...prev,
        {
          id: currentSessionId,
          title,
          messages: sessionMessages,
        }
      ]);
    }

    const newId = Date.now();
    setCurrentSessionId(newId);
    setMessages(prev => [...prev]);
  };

    const handleRetry = async (messageToRetry, indexToUpdate) => {
      setLoading(true);
      try {
        const regeneratingMsg = {
          sender: 'bot',
          text: 'Regenerating response...',
          role: 'bot',
          sessionId: currentSessionId,
        };
        setMessages((prev) => [
          ...prev.slice(0, indexToUpdate + 1),
          regeneratingMsg,
          ...prev.slice(indexToUpdate + 2),
        ]);
        let endpoint = 'query';
        if (tool === 'chart') endpoint = 'query/chart';
        else if (tool === 'table') endpoint = 'query/table';
        else if (tool === 'document') endpoint = 'query/document';

        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: messageToRetry.text }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Retry API Error:', errorText);
          throw new Error(`Retry request failed with status ${response.status}`);
        }
        const data = await response.json();
        const formattedChartData =
          data?.chart_type && data?.data?.labels && data?.data?.values
            ? {
                type: data.chart_type,
                labels: data.data.labels,
                values: data.data.values,
              }
            : null;

        const botMessage = {
          sender: 'bot',
          text:
            typeof data?.answer === 'string' ? data.answer :
            typeof data?.response === 'string' ? data.response :
            typeof data?.data === 'string' ? data.data :
            typeof data?.message === 'string' ? data.message :
            JSON.stringify(data),
          chartData: tool === 'chart' ? (formattedChartData || data?.chartData || null) : null,
          role: 'bot',
          sessionId: currentSessionId,
        };
         setMessages((prev) => [
          ...prev.slice(0, indexToUpdate + 1),
          botMessage,
          ...prev.slice(indexToUpdate + 2),
        ]);
      } catch (error) {
        console.error('Retry Error:', error);
        setMessages((prev) => [
          ...prev.slice(0, indexToUpdate + 1),
          {
            sender: 'bot',
            text: 'Error regenerating response.',
            role: 'bot',
            sessionId: currentSessionId,
          },
          ...prev.slice(indexToUpdate + 2),
        ]);
      } finally {
        setLoading(false);
      }
    };

    const handleDropupClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleDropupClose = () => {
      setAnchorEl(null);
    };

    const handleToolSelect = (selectedTool) => {
      setTool(prev => prev === selectedTool ? null : selectedTool);
      handleDropupClose();
    };

  const currentSessionMessages = messages.filter(msg => msg.sessionId === currentSessionId);
  return (
    <Box display="flex" height="100vh" bgcolor="rgba(14,14,35,1)" color="#fff" position="relative"  overflow="hidden">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.03,
          fontSize: { xs: '3rem', md: '6rem' },
          fontWeight: 'bold',
          color: '#ffffff',
          userSelect: 'none',
          whiteSpace: 'pre-line',
        }}
      >
        FinGenie
        <br />
        <span style={{ fontSize: '1.5rem', letterSpacing: 2 }}>by SOLCON CAPITAL</span>
      </Box>

      {sidebarOpen && (
        <Box
          width="250px"
          bgcolor="#1e1e3f"
          p={2}
          display="flex"
          flexDirection="column"
          zIndex={2}
          sx={{ 
            transition: '0.3s ease-in-out' }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setSidebarOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            mt={2}
            mb={2}
            px={2}
            py={1}
            bgcolor="#232A3B"
            borderRadius="8px"
            textAlign="center"
            sx={{ cursor: 'pointer', color: '#fff', fontWeight: 'bold' }}
            onClick={handleNewChat}
          >
          + New Chat
          </Box>
          <Typography variant="h6" mt={1} mb={1}>
            Chat History
          </Typography>
          {chatSessions.length === 0 ? (
            <Typography variant="body2" color="gray">No chats yet.</Typography>
          ) : (
            chatSessions.map((session, index) => (
              <Box
                key={index}
                p={1}
                my={1}
                bgcolor="#232A3B"
                borderRadius="8px"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentSessionId(session.id)}
              >
                {session.title}
              </Box>
            ))
          )}
        </Box>
      )}

      {!sidebarOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#fff' }}>
            <HistoryIcon />
          </IconButton>
          
          <Select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            sx={{
              backgroundColor: '#232A3B',
              color: 'white',
              borderRadius: '8px',
              '& .MuiSvgIcon-root': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
              height: '40px',
              minWidth: 120,
              textAlign: 'center',
            }}
          >
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="pro">Pro</MenuItem>
          </Select>
        </Box>
      )}
     <Box flex={1} display="flex" flexDirection="column" position="relative" zIndex={1}>
  <Box
    sx={{
      flex: 1,
      overflowY: 'auto',
      padding: 2,
      paddingBottom: '24px', 
    }}
  >
   {currentSessionMessages.map((msg, index) => (
  <Box
    key={index}
    my={1}
    display="flex"
    justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
    position="relative"
    flexDirection="column"
    alignItems={msg.role === 'user' ? 'flex-end' : 'flex-start'}
  >
    <Box
      px={2}
      py={1}
      bgcolor={msg.role === 'user' ? '#3f51b5' : '#232A3B'}
      borderRadius="10px"
      maxWidth="70%"
      sx={{
        color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.8)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text)}
    </Box>
   
    {msg.chartData && (
  <Box width="100%" maxWidth="70%">
    {renderChart(msg.chartData)}
  </Box>
)}
    {msg.role === 'user' && (
      <IconButton
        size="small"
        onClick={() => handleRetry(msg, index)}
        sx={{
          color: 'white',
          ml: 1,
          position: 'absolute',
          top: -10,
          right: -10,
          backgroundColor: '#444',
          '&:hover': {
            backgroundColor: '#666',
          },
        }}
      >
        <RefreshIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
))}

  </Box>
        <Paper
sx={{
      position: 'absolute',
      bottom: 0,
      left: 0, 
      width: '100%', 
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      height: 56,
      px: 2,
      borderRadius: '10px 10px 0 0',
      backgroundColor: '#232A3B',
      boxShadow: '0 0 8px rgba(0,0,0,0.2)',
      transition: 'width 0.3s ease-in-out',
    }}
      >
    <Box display="flex" gap={1} mr={2}>
      <Button
        variant={tool === 'chart' ? 'contained' : 'outlined'}
        onClick={() => {
          handleToolSelect('chart');
          if (inputValue.trim()) handleSend();
        }}
        sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none', minWidth: 70, padding: '2px 6px' }}
      >
        Chart
      </Button>
      <Button
        variant={tool === 'table' ? 'contained' : 'outlined'}
        onClick={() => handleToolSelect('table')}
        sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none', minWidth: 70,
        padding: '2px 6px 0 6px', }}
      >
      Table
      </Button>
      <Button
        variant={tool === 'document' ? 'contained' : 'outlined'}
        onClick={() => handleToolSelect('document')}
        sx={{ color: '#fff', borderColor: '#fff', textTransform: 'none', minWidth: 70,
        padding: '2px 6px', }}
      >
      Document
      </Button>
    </Box>
    <InputBase
      fullWidth
      placeholder={model === 'pro' ? 'Expert FinGenie...' : 'Ask FinGenie...'}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSend();
        }
      }}
      sx={{ ml: 3, flex: 1, color: '#fff', width: '100%' }}
    />
    <IconButton onClick={handleSend} sx={{ color: '#fff', ml: 1 }}>
      <SendIcon />
    </IconButton>
  </Paper>
    </Box>
    </Box>
  );
};

export default ChatPage;
