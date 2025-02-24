import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE } from "./constants";
import { ArrowIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";

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
    setResult,
  } = useStore();

  useEffect(() => {
    if (fromText === "") return;

    console.log("⌛ Traduciendo:", { fromLanguage, toLanguage, fromText });

    translate({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result == null) return;
        setResult(result);
      })
      .catch((error) => {
        console.error("❌ Error al traducir:", error);
        setResult("Error al traducir.");
      });
  }, [fromText, fromLanguage, toLanguage]);

  return (
    <Container fluid>
      <h1>🌍 Google Translate Clone</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
              loading={loading}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={() => interchageLanguages()}
          >
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
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
