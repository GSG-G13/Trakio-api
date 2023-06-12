interface details {
    message: string,
    path: string[],
    type: string,
    context: {}
}

interface joiInterface {
    name: string,
    isJoi: boolean,
    details: details[]
}

export default joiInterface
