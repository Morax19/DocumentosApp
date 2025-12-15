import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBaseAdmin from '../base/LayoutBase';
import '../../styles/general/homeGeneral.css';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';

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

    // Efecto para simular el filtrado de las carpetas
    useEffect(() => {
        const results = mockFolders.filter(folder =>
            folder.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFolders(results);
    }, [searchTerm]);

    // Navegación al hacer clic en carpeta
    const handleFolderClick = (folderName) => {
        console.log(`Navegando a la carpeta: ${folderName}`);
        const encodedFolderName = encodeURIComponent(folderName);
        navigate(`/${encodedFolderName}`);
    };

    return (
        <LayoutBaseAdmin activePage="home">
            <Box sx={{ p: 3 }} className="home-admin-container">
                {/* Título y Bienvenida */}
                <Box sx={{ mb: 3 }} className="title-section-home">
                    <Typography variant="h4" component="h2">Gestión de Documentos Gipsy</Typography>
                    <Typography variant="subtitle1">Bienvenido(a), Usuario</Typography>
                </Box>

                {/* Barra de Búsqueda */}
                <Box sx={{ mb: 3, maxWidth: 600 }} className="search-bar-container">
                    <TextField
                        fullWidth
                        placeholder="Buscar ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="buscar" edge="end">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Cuadrícula de Carpetas */}
                <Box className="folders-grid-container">
                    {filteredFolders.length > 0 ? (
                        <Grid container spacing={2} className="folders-grid">
                            {filteredFolders.map((folder) => (
                                <Grid item key={folder.id} xs={12} sm={6} md={4} lg={3}>
                                    <Card>
                                        <CardActionArea onClick={() => handleFolderClick(folder.name)}>
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                    <FolderIcon />
                                                </Avatar>
                                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="body1" className="folder-name">{folder.name}</Typography>
                                                    <IconButton
                                                        aria-label={`editar-${folder.id}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log(`Acceso directo a: ${folder.name}`);
                                                            // abrir modal o navegar a edición si es necesario
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography className="no-results-home">No se encontraron carpetas.</Typography>
                    )}
                </Box>
            </Box>
        </LayoutBaseAdmin>
    );
};

export default HomeAdmin;