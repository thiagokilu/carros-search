import { useState, useEffect } from "react";
import "./App.css";
import Modal from "./components/modal";
import { CirclePlus } from "lucide-react";

function App() {
	const [busca, setBusca] = useState("");
	const [ordem, setOrdem] = useState("crescente"); // Define "crescente" como padrão
	const [modal, setModal] = useState(false); // Define "crescente" como padrão
	const [data, setData] = useState("");

	const nomeLower = busca.toLowerCase();

	const [carros, setCarros] = useState([]);

	useEffect(() => {
		fetch("https://github.com/thiagokilu/carros-search")
			.then((response) => response.json())
			.then((data) => {
				console.log(data); // Exibe os dados no console
				setCarros(data); // Substitui a lista pelo que vem da API
			})
			.catch((error) => console.error("Erro ao buscar os dados:", error));
	}, []);

	const addCarro = (carro) => {
		const carroFormatado = {
			...carro,
			valor: Number.parseFloat(carro.valor), // Converte o valor para número
		};

		fetch("https://github.com/thiagokilu/carros-search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(carroFormatado),
		})
			.then((response) => response.json())
			.then((novoCarro) => {
				setCarros((prevCarros) => [...prevCarros, novoCarro]); // Atualiza o estado com o novo carro
			})
			.catch((error) => console.error("Erro ao adicionar carro:", error));
	};

	// Agora busca por modelo, marca e ano
	const carrosFiltrados = carros.filter(
		(carro) =>
			carro.modelo.toLowerCase().includes(nomeLower) ||
			carro.marca.toLowerCase().includes(nomeLower) ||
			carro.ano.toString().includes(nomeLower) || // Converte ano para string para permitir busca numérica
			carro.valor.toString().includes(nomeLower),
	);

	// Ordenar os carros antes de exibir
	const carrosOrdenados = [...carrosFiltrados].sort((a, b) => {
		if (ordem === "crescente") return a.ano - b.ano; // Ordem crescente por ano
		if (ordem === "decrescente") return b.ano - a.ano; // Ordem decrescente por ano
		if (ordem === "valorCrescente") return a.valor - b.valor; // Ordem crescente por valor
		if (ordem === "valorDecrescente") return b.valor - a.valor; // Ordem decrescente por valor
		return 0; // Caso não haja uma ordem válida
	});

	return (
		<div className="flex items-center justify-center flex-col h-[100vh]">
			<h1 className="text-4xl mb-10">Filter Cars</h1>

			<div className="flex flex-row gap-10 mb-5 font-semibold items-center">
				<input
					type="text"
					placeholder="Busque por modelo, marca ou ano"
					value={busca}
					onChange={(ev) => setBusca(ev.target.value)}
					className="border-2 rounded-lg p-2"
				/>

				<select
					name="ordem"
					id="ordem"
					value={ordem}
					onChange={(ev) => setOrdem(ev.target.value)}
					className="bg-black text-white rounded-lg p-2"
				>
					<option value="crescente">Ano: Crescente</option>
					<option value="decrescente">Ano: Decrescente</option>
					<option value="valorCrescente">Valor: Crescente</option>
					<option value="valorDecrescente">Valor: Decrescente</option>
				</select>

				<button
					type="button"
					className="flex flex-row gap-2 bg-black text-white rounded-lg p-2 hover:cursor-pointer"
					onClick={() => setModal(true)}
				>
					<CirclePlus />
					Cadastrar
				</button>
			</div>

			{/* Container com scroll para a tabela */}
			<div className="w-full max-w-4xl h-[400px] overflow-y-auto border-2 border-black rounded-lg">
				<table className="w-full border-collapse">
					<thead className="sticky top-0 bg-gray-200">
						<tr>
							<th className="border-2 border-black px-4 py-2">Modelo</th>
							<th className="border-2 border-black px-4 py-2">Marca</th>
							<th className="border-2 border-black px-4 py-2">Ano</th>
							<th className="border-2 border-black px-4 py-2">Valor</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{carrosOrdenados.map((carro, i) => (
							<tr key={i}>
								<td className="border-2 border-black px-4 py-2">
									{carro.modelo}
								</td>
								<td className="border-2 border-black px-4 py-2">
									{carro.marca}
								</td>
								<td className="border-2 border-black px-4 py-2">{carro.ano}</td>
								<td className="border-2 border-black px-4 py-2">
									{carro.valor.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
									})}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Modal
				isopen={modal}
				setModal={() => setModal(!modal)}
				onSubmitData={addCarro}
			/>
		</div>
	);
}

export default App;
