export default class SocketChatroom extends React.Component {
    constructor(props, context) {
        super(props, context)

        const { chatHistory } = props

        this.state = {
            chatHistory,
            input: ""
        }
        this.updateChatHistory = this.updateChatHistory.bind(this)
        this.onMessageReceived = this.onMessageReceived.bind(this)
        this.onSendMessage = this.onSendMessage.bind(this)
...
    }
    componentDidMount() {
        this.props.registgerHandler(this.onMessageReceived)
    }

    componentDidUpdate() {
        this.scrollChatToBottom()
    }

    componentWillUnmount() {
        this.props.unregisterHandler()
    }

    updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }

    onMessageReceived(entry) {
        this.updateChatHistory(entry)
    }

    onSendMessage() {
        if (!this.state.input)
            return
        this.props.onMessageReceived(this.state.input, (err) => {
            if (err)
                return console.error(err)

            return this.setState({ input: "" })
        })
    }

    ...
}