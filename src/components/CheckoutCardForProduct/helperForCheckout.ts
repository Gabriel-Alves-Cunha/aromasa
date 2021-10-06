import Nope from "nope-validator";

import { envVariables } from "utils/env";

export type FrenetForm = {
	sendEmailConfirmation: boolean;
	totalPriceChosen?: string;
	addressComplement: string;
	federalDocument: string;
	stateDocument: string;
	addressNumber: string;
	neighborhood: string;
	phoneNumber: string;
	companyName: string;
	platformId: number;
	logradouro: string;
	pessoa: "F" | "J";
	password: string;
	plancode: number;
	platform: string;
	agencyId: number;
	urlSite: string;
	zipCode: string;
	timeout: number;
	agency: string;
	total: string;
	state: string;
	email: string;
	city: string;
	type: number;
	name: string;
};

export const urlDeNãoSeiMeuCep =
	"https://buscacepinter.correios.com.br/app/endereco/index.php?t";
export const urlDeBuscarInfoDeUmEstado = (uf: string) =>
	`https://brasilapi.com.br/api/ibge/uf/v1/${uf}`;

export const nopeSchema = Nope.object().shape({
	email: Nope.string()
		.email()
		.required(
			"E-mail do cliente, este campo é o mais importante de toda a API, será usado como chave para autenticação no painel administrativo e para os comunicados enviados pelo Frenet"
		),
	type: Nope.number().required(
		"Identifica o tipo do cliente, por enquanto aceita apenas o valor 1 (Clientes)"
	),
	// TODO: RESOLVE THIS: .default("1"),
	password: Nope.string().min(
		8,
		"Uma senha de no mínimo 8 caracters é necessária!"
	),
	// "Senha definida para o cliente, será a senha para autenticação no painel administrativo do Frenet, quando não informada será gerada uma senha aleatória e esta será enviada por e-mail ao cliente somente se o campo SendEmail for igual a true"
	name: Nope.string().required(
		"Nome completo da pessoa física ou a Razão Social da pessoa Jurídica, o campo é utilizado para exibição do nome do cliente dentro do painel administrativo do Frenet"
	),
	pessoa: Nope.string()
		.required(
			"Pessoa física ou jurídica, onde F identifica uma pessoa física e J uma pessoa jurídica"
		)
		.oneOf(["F", "J"]),
	companyName: Nope.string(), //.required(
	// 	"Nome completo da pessoa física ou a Razão Social da pessoa Jurídica, o campo é utilizado na geração de boletos e comunicados via e-mail"
	// ),
	federalDocument: Nope.string().required(
		"CPF da pessoa física ou CNPJ da pessoa jurídica"
	),
	stateDocument: Nope.string(),
	// "Inscrição estadual da pessoa jurídica, não se aplica para pessoa fisica e se informado será ignorado"
	urlSite: Nope.string()
		// .default(envVariables.aromasaUrl)
		.required("Url da loja/site da pessoa ou empresa"),
	zipCode: Nope.string()
		.required(
			"CEP da empresa ou pessoa física, este campo é usado como CEP de origem no momento da cotação de Frete"
		)
		.min(6),
	city: Nope.string().required(
		"Cidade da empresa ou residência da pessoa física, este campo é usado na geração das faturas de cobrança"
	),
	state: Nope.string().required(
		"Código abreviado do Estado da empresa ou residência da pessoa física, este campo é usado na geração das faturas de cobrança"
	),
	logradouro: Nope.string().required(
		"Logradouro da empresa ou residência da pessoa física, este campo é usado na geração das faturas de cobrança"
	),
	addressNumber: Nope.string().required(
		"Número do logradouro da empresa ou residência da pessoa física, este campo é usado na geração das faturas de cobrança"
	),
	addressComplement: Nope.string(), //"Complemento do endereço da empresa ou residência da pessoa física, este campo é usado na geração das faturas de cobrança"
	neighborhood: Nope.string().required(
		"Bairro da empresa ou residência da pessoa física, este campo é usado na geração das faturas de cobrança"
	),
	phoneNumber: Nope.string().min(10).max(18),
	platformId: Nope.string().required(
		"Código da plataforma, o valor para este campo será informado pela equipe de integração do Frenet"
	),
	platform: Nope.string().required(
		"Nome da plataforma, o valor para este campo será informado pela equipe de integração do Frenet"
	),
	agencyId: Nope.string().required(
		"Código da agência, o valor para este campo será informado pela equipe de integração do Frenet"
	),
	agency: Nope.string().required(
		"Nome da agência, o valor para este campo será informado pela equipe de integração do Frenet"
	),
	plancode: Nope.string()
		// .default("1")
		.required(
			"Código do plano, o valor para este campo será informado pela equipe de integração do Frenet"
		),
	timeout: Nope.string()
		// .default("10_000")
		.required("Tempo máximo de resposta da API de cotação"),
	sendEmailConfirmation: Nope.boolean()
		// .default(true)
		.required(
			"Flag informando se após a chamada da API um e-mail para confirmação/validação será enviado para o cliente, é necessário para confirmação do e-mail informado no campo E-mail"
		),
	total: Nope.string(),
});

export const defaultValues: FrenetForm = {
	urlSite: envVariables.aromasaUrl,
	sendEmailConfirmation: true,
	addressComplement: "",
	federalDocument: "",
	stateDocument: "",
	addressNumber: "",
	neighborhood: "",
	timeout: 10_000,
	companyName: "",
	phoneNumber: "",
	logradouro: "",
	platformId: 0,
	password: "",
	platform: "",
	pessoa: "F",
	plancode: 0,
	agencyId: 0,
	zipCode: "",
	agency: "",
	state: "",
	total: "",
	email: "",
	city: "",
	name: "",
	type: 1,
};

export const cpfFormatado = (cpf: string) =>
	cpf.length === 11
		? cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")
		: cpf;

export const cepFormatado = (cep: string) =>
	cep.length === 8 ? cep.replace(/(\d{5})?(\d{3})/, "$1-$2") : cep;

export const foneFormatado = (fone: string) =>
	fone.length === 11
		? fone.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, "($1) $2 $3-$4")
		: fone;
