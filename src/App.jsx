import React, { useState } from 'react';
import Livro1 from '../public/box1.png';
import Livro2 from '../public/box2.png';
import Livro3 from '../public/box3.png';
import Livro4 from '../public/box4.png';
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'; // Arquivo de estilos (CSS)

const App = () => {
  // Definir as imagens para o carrossel
  const livros = [Livro1, Livro2, Livro3, Livro4];

  // Estado para a imagem atual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFreteVisible, setIsFreteVisible] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false); // Estado para exibir opções de pagamento
  const [cep, setCep] = useState('');
  const [freteOptions, setFreteOptions] = useState([]);
  const [selectedFrete, setSelectedFrete] = useState(null); // Estado para armazenar o frete selecionado

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsFreteVisible(false);
    setIsPaymentVisible(false);
    setCep('');
    setFreteOptions([]);
    setSelectedFrete(null); // Limpar o frete selecionado
  };

  // Função para navegar para a imagem anterior
  const previousImage = () => {
    const isFirstImage = currentIndex === 0;
    setCurrentIndex(isFirstImage ? livros.length - 1 : currentIndex - 1);
  };

  // Função para navegar para a próxima imagem
  const nextImage = () => {
    const isLastImage = currentIndex === livros.length - 1;
    setCurrentIndex(isLastImage ? 0 : currentIndex + 1);
  };

  // Função para gerar opções de frete aleatórias
  const generateFreteOptions = () => {
    const fretes = [
      { tipo: "Correios", valor: (Math.random() * (30 - 10) + 10).toFixed(2), prazo: `${Math.floor(Math.random() * 5) + 1} dias úteis` },
      { tipo: "Jadlog", valor: (Math.random() * (20 - 5) + 5).toFixed(2), prazo: `${Math.floor(Math.random() * 10) + 3} dias úteis` },
      { tipo: "Sedex", valor: (Math.random() * (50 - 20) + 20).toFixed(2), prazo: `${Math.floor(Math.random() * 15) + 5} dias úteis` },
    ];

    setFreteOptions(fretes);
    setIsFreteVisible(true);
  };

  // Função para lidar com o envio do CEP
  const handleCepSubmit = (e) => {
    e.preventDefault();
    // Validação simples de CEP (apenas exemplo)
    if (cep.length === 8 && !isNaN(cep)) {
      generateFreteOptions();
    } else {
      alert("CEP inválido!");
    }
  };

  // Função para selecionar o frete
  const handleFreteSelect = (frete) => {
    setSelectedFrete(frete); // Salvar o frete selecionado
    setIsFreteVisible(false); // Esconder as opções de frete
    setIsPaymentVisible(true); // Mostrar as opções de pagamento
  };

  return (
    <div className="book-sales-container">
      <marquee className="text-marq">PROMOÇÃO TERMINA EM <b>01:36</b></marquee>
      <div className="product-container">
        {/* Carrossel de imagens */}
        <div className="product-image">
          <button onClick={previousImage} className="carousel-button left"><i className="bi bi-arrow-left-short"></i></button>
          <img
            src={livros[currentIndex]}
            alt={`Capa do livro ${currentIndex + 1}`}
            className="book-cover"
          />
          <button onClick={nextImage} className="carousel-button right"><i className="bi bi-arrow-right-short"></i></button>
        </div>
        <div className="product-info">
          <h1 className="product-title">Box Café com Deus Pai | Edição 2025</h1>
          <div className='starts'>
            <i className="bi bi-star-fill"><b style={{color: 'black'}}> 5</b></i>
          </div>
          <p className="product-previous-price"><del>R$ 99,89</del></p>
          <p className="product-price">R$ 47,00</p>
          <button className="purchase-button" onClick={openModal}>Comprar Agora</button>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="book-description">
        <h2>Descrição do Produto</h2>
        <p>
          Já imaginou viver uma experiência completa de Café com Deus Pai? O box queridinho do momento está de volta, e com uma versão ainda mais premium! São itens selecionados, pensados em cada detalhe para tornar seu momento Café com Deus Pai ainda mais especial.
          O Box inclui:
          Livro Café com Deus Pai em Capa Dura: Uma edição luxuosa
          e durável, perfeita para suas leituras diárias. Cada página traz mensagens inspiradoras que vão tocar sua alma. 365 mensagens inéditas.
          - Caneca Exclusiva (350ml): Desfrute do seu café com estilo
          e conforto nesta caneca única em cerâmica, criada especialmente para este Box.
          - Lata de Café Gourmet (200g): Um café artesanal de alta
          qualidade, selecionado para acompanhar seus momentos de leitura e reflexão.
          Filtro Exclusivo no Brasil: Tenha uma experiência de café diferenciada com este filtro, disponível apenas nesta coleção.
          - Post-its: Anote suas reflexões, inspirações e pensamentos nas páginas do livro ou em qualquer lugar que desejar, com esses post-its personalizados. (12 blocos de 25 folhas cada)
        </p>
      </div>

      <div className="author-info">
        <h3>Presentes:</h3>
        <p><b>- Copo:</b> Copo exclusivo Café com Deus Pai (250ml).<br />
        <b>- Ecobag:</b> Leve seu livro para onde você for com a ecobag Café com Deus Pai.</p>
      </div>

      {/* Modal para inserir CEP */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {!isPaymentVisible && (
              <>
                <h2>Informe seu CEP</h2>
                <form onSubmit={handleCepSubmit}>
                  <label htmlFor="cep">CEP:</label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    required
                  />
                  <button type="submit" className="submit-button">Confirmar</button>
                </form>

                {/* Mostrar as opções de frete após o CEP ser inserido */}
                {isFreteVisible && (
                  <div className="frete-options">
                    <h3>Opções de Frete</h3>
                    <ul>
                      {freteOptions.map((frete, index) => (
                        <li key={index} onClick={() => handleFreteSelect(frete)}>
                          <strong>{frete.tipo}</strong>: R${frete.valor} - {frete.prazo}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Mostrar opções de pagamento após o frete ser selecionado */}
            {isPaymentVisible && selectedFrete && (
              <>
                <h2>Escolha a Forma de Pagamento</h2>
                <p>Produto: R$ 47,00</p>
                <p>Frete: R$ {selectedFrete.valor}</p>
                <form>
                  <label htmlFor="payment-method">Método de Pagamento:</label>
                  <button type="submit" className="submit-button">PIX</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
