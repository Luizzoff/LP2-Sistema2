import { useNavigate } from 'react-router-dom';
import imagem404 from '../../assets/imagens/imagem404.png'
import { Container } from 'react-bootstrap';

export default function Tela404(props) {
    const navigate = useNavigate();
    
    return (
        <Container className="w-100 d-flex justify-content-center align-items-center vh-100 position-relative">
            <img src={imagem404} alt="Erro 404" />
            <button
                onClick={() => navigate('/')}
                className="btn btn-primary position-absolute fs-5"
                style={{ width: '13em', height: '3em', borderRadius: '10px', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                GO TO HOME
            </button>
        </Container>

    );
}