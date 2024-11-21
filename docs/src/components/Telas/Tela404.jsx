import Pagina from '../layouts/Pagina'
import imagem404 from '../../assets/imagens/imagem404.png'
export default function Tela404(props) {
    return (
        <Pagina>
            <img src={imagem404} alt="Erro 404" />
            <h1 className="text-center">O recurso solicitado não existe</h1>
        </Pagina>
    );
}