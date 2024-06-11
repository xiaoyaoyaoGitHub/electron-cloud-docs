import React, { useState, useCallback, useRef, useEffect } from "react";
import { MDXEditor, UndoRedo, InsertCodeBlock, headingsPlugin, markdownShortcutPlugin, ChangeCodeMirrorLanguage, ShowSandpackInfo, InsertSandpack, BoldItalicUnderlineToggles, toolbarPlugin, CodeToggle, codeBlockPlugin, sandpackPlugin, codeMirrorPlugin, ConditionalContents } from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live react',
            sandpackTemplate: 'react',
            sandpackTheme: 'light',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: defaultSnippetContent
        },
    ]
}


const MDEditor = ({ value, onChangeMarkDown }) => {

    const markDownRef = useRef(null);

    useEffect(() => {
        markDownRef.current.setMarkdown(value)
    }, [value])

    const onChange = useCallback((value) => {
        onChangeMarkDown(value)
    }, [])

    return <MDXEditor ref={markDownRef} markdown={value}
        onChange={onChange}
        plugins={[
            headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4] }),
            codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
            sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
            codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
            toolbarPlugin({
                toolbarContents: () => (
                    <>
                        {' '}
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />

                        <ConditionalContents
                            options={[
                                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                                { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                                {
                                    fallback: () => (<>
                                        <InsertCodeBlock />
                                        <InsertSandpack />

                                    </>)
                                }
                            ]}
                        />
                    </>
                )
            }),
            markdownShortcutPlugin()
        ]}

    />
}

export default MDEditor