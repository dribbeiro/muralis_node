-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 23-Fev-2023 às 14:32
-- Versão do servidor: 8.0.23
-- versão do PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `muralis_node`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `nome` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`, `descricao`) VALUES
(1, 'Alimentação', 'Gastos com alimentação'),
(2, 'Transporte', 'Gastos com transporte');

-- --------------------------------------------------------

--
-- Estrutura da tabela `despesas`
--

CREATE TABLE `despesas` (
  `id` int NOT NULL,
  `valor` double NOT NULL,
  `data_compra` datetime NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_pagamento_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  `cep` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `logradouro` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `complemento` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `bairro` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `localidade` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `uf` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `despesas`
--

INSERT INTO `despesas` (`id`, `valor`, `data_compra`, `descricao`, `tipo_pagamento_id`, `categoria_id`, `cep`, `logradouro`, `complemento`, `bairro`, `localidade`, `uf`, `numero`) VALUES
(1, 140, '2023-02-23 16:24:48', 'Outback', 1, 1, '', '', '', '', '', '', ''),
(2, 100, '2023-02-21 13:26:38', 'Ipiranga', 3, 2, '', '', '', '', '', '', ''),
(3, 14.67, '2023-02-23 13:26:38', 'Uber', 3, 2, '', '', '', '', '', '', ''),
(4, 20.31, '2023-02-22 15:31:22', 'Viagem', 3, 2, '', '', '', '', '', '', ''),
(9, 20.31, '2023-02-23 15:31:22', 'Viagem', 1, 2, '08675-040', 'Rua Washington Luiz', '', 'Vila Costa', 'Suzano', 'SP', '195');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipos_pagamento`
--

CREATE TABLE `tipos_pagamento` (
  `id` int NOT NULL,
  `tipo` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `tipos_pagamento`
--

INSERT INTO `tipos_pagamento` (`id`, `tipo`) VALUES
(1, 'Dinheiro'),
(2, 'Débito'),
(3, 'Crédito'),
(4, 'Pix');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `despesas`
--
ALTER TABLE `despesas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `tipo_pagamento_id` (`tipo_pagamento_id`);

--
-- Índices para tabela `tipos_pagamento`
--
ALTER TABLE `tipos_pagamento`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `despesas`
--
ALTER TABLE `despesas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tipos_pagamento`
--
ALTER TABLE `tipos_pagamento`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `despesas`
--
ALTER TABLE `despesas`
  ADD CONSTRAINT `despesas_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `despesas_ibfk_2` FOREIGN KEY (`tipo_pagamento_id`) REFERENCES `tipos_pagamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
