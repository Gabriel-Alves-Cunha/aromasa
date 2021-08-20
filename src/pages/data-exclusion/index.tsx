import { getLayout } from "../../components/Layout";
import { Header } from "../../components";

import { Container } from "./styles";

function DataExclusion() {
	return (
		<>
			<Header />

			<Container></Container>
		</>
	);
}

DataExclusion.getLayout = getLayout;

export default DataExclusion;
