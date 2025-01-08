import React, { useState } from 'react';
import './Qrcode.css'; // Importe o arquivo CSS

const Qrcode = ({ valorTransacao }) => {
  // Função que gera o payload com base no valor da transação
  const gerarPayload = (valorTransacao) => {
    let payload = '';

    // Formatação do valor da transação para garantir que sempre tenha duas casas decimais
    const valorFormatado = parseFloat(valorTransacao).toFixed(2);

    // Definindo os payloads conforme os valores fornecidos
    if (valorFormatado === '71.77') {
      payload = '00020126330014BR.GOV.BCB.PIX011102108474684520400005303986540571.775802BR5901N6001C62060502PG6304D502';
    } else if (valorFormatado === '63.30') {
      payload = '00020126330014BR.GOV.BCB.PIX011102108474684520400005303986540563.305802BR5901N6001C62070503***63040597';
    } else if (valorFormatado === '69.36') {
      payload = '00020126330014BR.GOV.BCB.PIX011102108474684520400005303986540569.365802BR5901N6001C62070503***63040583';
    } else {
      payload = 'Valor de transação não suportado'; // Mensagem padrão caso o valor não seja um dos esperados
    }

    return payload;
  };

  // Gerar o payload com base no valor da transação
  const payload = gerarPayload(valorTransacao);

  // Função para copiar o texto para a área de transferência
  const copiarParaAreaDeTransferencia = () => {
    const texto = document.getElementById('payloadText');
    texto.select(); // Seleciona o texto
    document.execCommand('copy'); // Copia o texto selecionado
    alert('Código copiado com sucesso !')
  };

  return (
    <div>
      <h3 style={{color: 'green'}}>R${valorTransacao}</h3>
      <textarea
        id="payloadText"
        rows="6"
        cols="80"
        style={{ width: '80%', height: '30px' }}
        value={payload}
        readOnly
      />
      <br />
      <button className="button-copiar" onClick={copiarParaAreaDeTransferencia}>
        Copiar Payload
      </button>
    </div>
  );
};

export default Qrcode;
