import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useTranslation() {
    const [language, setLanguage] = useState("en");
    return {language, setLanguage};
}

interface getLanguageFileProps {
    language: string,
    path: string
}

async function getLanguageFile({language, path}: getLanguageFileProps) {
    const module = await import(`../services/translation/${language}/${path}`);
    return module.default;
}

async function updateLanguage(newLanguage: string) {
    const [language, setLanguage] = useLocalStorage("language", "en");
    setLanguage(newLanguage);
}