import { useState } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useEffect } from 'react'

const FullTextEditor = ({ data, onChange }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        if (data) {
            console.log('data', data)
            const contentState = htmlToDraft(data)
            console.log('contentState', contentState)
            const state = EditorState.createWithContent(ContentState.createFromBlockArray(contentState.contentBlocks))
            setEditorState(state)
        }
    }, [])

    const handleChange = newEditorState => {
        setEditorState(newEditorState)
        const contentState = newEditorState.getCurrentContent()
        const raw = convertToRaw(contentState)
        const html = draftToHtml(raw)

        onChange(html)
    }

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleChange}
            // theme it using MUI
            toolbar={{
                options: [
                    'inline',
                    'blockType',
                    'fontSize',
                    'list',
                    'textAlign',
                    'colorPicker',
                    'link',
                    'emoji',
                    'history',
                ],
                inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                },
                blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                },
                fontSize: {
                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                },
                list: {
                    inDropdown: true,
                    options: ['unordered', 'ordered', 'indent', 'outdent'],
                },
                textAlign: {
                    inDropdown: true,
                    options: ['left', 'center', 'right', 'justify'],
                },
                link: {
                    inDropdown: true,
                    showOpenOptionOnHover: true,
                    defaultTargetOption: '_blank',
                    options: ['link', 'unlink'],
                },
                history: {
                    inDropdown: false,
                    options: ['undo', 'redo'],
                },
            }}
        />
    )
}

export default FullTextEditor
