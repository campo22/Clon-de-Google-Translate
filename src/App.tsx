import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, Stack } from "react-bootstrap";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./constants";
import { ArrowIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromLanguage,
    interchageLanguages,
    setToLanguage,
    setFromText,
    setResult, } = useStore();

  return (
    <Container fluid>
      <h1>Gogle translate</h1>
      <Row>
        <Col>
          <Stack gap={2} >
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />

            <TextArea

              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
              loading={loading}

            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => interchageLanguages()}>
            <ArrowIcon />
          </Button>
        </Col>

        <Col >
          <Stack gap={2} >
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />

            <TextArea

              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
