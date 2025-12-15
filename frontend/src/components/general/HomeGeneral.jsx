import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBaseAdmin from '../base/LayoutBase';

// MUI imports (v7)
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import SearchIcon from '@mui/icons-material/Search';
import FolderOpenOutlined from '@mui/icons-material/FolderOpenOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';

const isDevelopment = import.meta.env.MODE === 'development';
const apiUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD;

const HomeAdmin = () => {
    const { user } = useAuth();
    const hasRole = (roleId) => {
        if (!user) return false;
        return Array.isArray(user.roles) && user.roles.some(r => (typeof r === 'number' ? r === roleId : (r.id === roleId || r.roleId === roleId)));
    };
    const isEditor = hasRole(11);
    const isLector = hasRole(12);
    const isOnlyLector = isLector && !isEditor;
    const [mockFolders, setMockFolders] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filteredFolders, setFilteredFolders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFolders = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${apiUrl}/documents/getDocType`);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                setMockFolders(data);
            } catch (err) {
                setError(err.message);
                setMessage('Error al cargar las carpetas.');
                console.error('Error al obtener las carpetas:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFolders();
    }, []);
    
    useEffect(() => {
        if(!searchTerm) {
            setFilteredFolders(mockFolders);
            return;
        }

        const results = mockFolders.filter(folder =>
            folder.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleFolderClick = (folderName) => {
        const encodedFolderName = encodeURIComponent(folderName);
        navigate(`/${encodedFolderName}`, { state: { folderId: folderId, folderName: folderName } });
    };

    // Función para manejar el clic en el ícono de edición
    const handleEditClick = (e, folderId, folderName) => {
        e.stopPropagation(); 
        
        navigate('/document-type', {
            state: { folderId: folderId, folderName: folderName, isEditing: true }
        });
    };   

    return (
        <LayoutBaseAdmin activePage="home">
            <Box sx={{ p: 3 }}>
                <Stack spacing={1} mb={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography 
                            variant="h5"
                            component="h2"
                            sx={{ color: "#421d83", fontWeight: 'bold' }}
                        >
                            Gestión de Documentos Gipsy
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                        >
                            Bienvenido(a), Usuario
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                        <TextField
                            id="search-home-page"
                            label="Buscar Documento"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                            aria-label="buscar carpetas"
                        />
                    </Box>
                </Stack>

                <Box>
                    {filteredFolders.length > 0 ? (
                        <Grid container spacing={2}>
                            {filteredFolders.map((folder) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={folder.id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': { boxShadow: 3, transform: 'translateY(-2px)' },
                                            transition: 'all 150ms ease',
                                            height: '100%'
                                        }}
                                        onClick={() => handleFolderClick(folder.name)}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: 1
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
                                                <FolderOpenOutlined color="primary" sx={{ fontSize: 34 }} />
                                                <Typography noWrap variant="body1">
                                                    {folder.name}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Tooltip title="Editar">
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log(`Acceso directo a: ${folder.name}`);
                                                            // agregar lógica para editar o abrir enlace
                                                        }}
                                                        aria-label={`editar ${folder.name}`}
                                                    >
                                                        <EditOutlined fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography color="text.secondary">No se encontraron carpetas.</Typography>
                    )}
                </Box>
            </Box>
        </LayoutBaseAdmin>
    );
};

export default HomeAdmin;