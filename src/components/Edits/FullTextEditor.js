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
            const contentState = htmlToDraft(data)
            const state = EditorState.createWithContent(ContentState.createFromBlockArray(contentState.contentBlocks))
            setEditorState(state)
        }
    }, [])

    // if component gets unmounted and mounted again (e.g. when navigating to another tab and back) the editorState is lost
    // so we need to set it again, but dont do it when component is mounted because the cursor will jump to the end
    useEffect(() => {
        if (data !== draftToHtml(convertToRaw(editorState.getCurrentContent()))) {
            const contentState = htmlToDraft(data)
            const state = EditorState.createWithContent(ContentState.createFromBlockArray(contentState.contentBlocks))
            setEditorState(state)
        }
    }, [data])

    // scroll to bottom of editor when adding a new line -> magic happens here
    useEffect(() => {
        const editor = document.querySelector('.rdw-editor-main')
        const editorStateBlocksArray = editorState.getCurrentContent().getBlocksAsArray()
        const lastBlock = editorStateBlocksArray[editorStateBlocksArray.length - 1]
        const lastBlockKey = lastBlock.getKey()
        const lastBlockTextLength = lastBlock.getLength()
        const selectionState = editorState.getSelection()
        const currentKey = selectionState.getStartKey()
        const currentOffset = selectionState.getStartOffset()
        if (currentKey === lastBlockKey && currentOffset === lastBlockTextLength) editor.scrollTop = editor.scrollHeight
    }, [editorState])

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
