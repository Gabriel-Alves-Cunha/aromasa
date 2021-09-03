import { Header, NormalLayoutWithFooter } from "components";

import { Container } from "./styles";

function DataExclusion() {
	return (
		<>
			<Header />

			<Container></Container>
		</>
	);
}

DataExclusion.getLayout = NormalLayoutWithFooter;

export default DataExclusion;
