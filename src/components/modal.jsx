import { CircleX } from "lucide-react";
import React, { useState } from "react";

export default function Modal({ isopen, setModal, onSubmitData }) {
	if (isopen) {
		const [formData, setFormData] = useState({
			modelo: "",
			marca: "",
			ano: "",
			valor: "",
		});

		const handleChange = (e) => {
			const { name, value } = e.target;
			setFormData({
				...formData,
				[name]: value, // Atualiza o valor do campo específico
			});
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			onSubmitData(formData);
			console.log(formData); // Aqui você pode enviar os dados ou fazer outra ação
		};

		return (
			<div className="fixed flex flex-col gap-10 justify-center items-center w-2xl h-2xl pb-10 bg-slate-300 rounded-lg">
				<div className="hover:cursor-pointer w-full mb-5">
					<CircleX className="absolute right-0 mr-1 mt-1" onClick={setModal} />
				</div>
				<h1 className="text-3xl">Cadastrar veículo</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						<div className="flex flex-row items-center gap-2">
							<span>Modelo</span>
							<small className="text-gray-500">Ex: Corolla</small>
						</div>
						<input
							type="text"
							name="modelo"
							value={formData.modelo}
							onChange={handleChange}
							className="bg-slate-50 rounded-lg p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-3">
						<div className="flex flex-row items-center gap-2">
							<span>Marca</span>
							<small className="text-gray-500">Ex: Toyota</small>
						</div>
						<input
							type="text"
							name="marca"
							value={formData.marca}
							onChange={handleChange}
							className="bg-slate-50 rounded-lg p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-3">
						<div className="flex flex-row items-center gap-2">
							<span>Ano</span>
							<small className="text-gray-500">Ex: 2020</small>
						</div>
						<input
							type="text"
							name="ano"
							value={formData.ano}
							onChange={handleChange}
							className="bg-slate-50 rounded-lg p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-3">
						<div className="flex flex-row items-center gap-2">
							<span>Preço</span>
							<small className="text-gray-500">Ex: 50000</small>
						</div>
						<input
							type="text"
							name="valor"
							value={formData.valor}
							onChange={handleChange}
							className="bg-slate-50 rounded-lg p-2"
							required
						/>
					</div>

					<div className="flex flex-row gap-10 mt-10">
						<button
							type="button"
							className="bg-red-500 p-2 rounded-lg text-white"
							onClick={setModal}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="bg-green-500 p-2 rounded-lg text-white hover:cursor-pointer"
						>
							Enviar
						</button>
					</div>
				</form>
			</div>
		);
	}

	return null;
}
