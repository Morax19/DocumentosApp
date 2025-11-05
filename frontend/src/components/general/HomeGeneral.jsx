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

// Datos simulados para las carpetas
const mockFolders = [
    { id: 1, name: 'Contrato de Arrendamiento' },
    { id: 2, name: 'RIF' },
    { id: 3, name: 'Vehículos' },
    { id: 4, name: 'Poderes' },
    { id: 5, name: 'Permiso Sanitario Locales' },
    { id: 6, name: 'Registros Mercantiles' },
    { id: 7, name: 'Patente' },
    { id: 8, name: 'Corpoelec' },
    { id: 9, name: 'Registro Sanitario' },
    { id: 10, name: 'Pólizas Seguro' },
    { id: 11, name: 'Dominios' },
];

const HomeAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFolders, setFilteredFolders] = useState(mockFolders);
    const navigate = useNavigate();

    useEffect(() => {
        const results = mockFolders.filter(folder =>
            folder.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFolders(results);
    }, [searchTerm]);

    const handleFolderClick = (folderName) => {
        const encodedFolderName = encodeURIComponent(folderName);
        navigate(`/${encodedFolderName}`);
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