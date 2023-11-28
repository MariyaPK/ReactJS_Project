export const bookReducer = (state, action) => {
    switch (action.type) {
        case 'BOOKS_FETCH':
            return { ...action.payload };
        case 'COMMENT_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            username: action.username,
                        }
                    }
                ],
            }
        default:
            return state;
    }
};