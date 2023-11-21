export const bookReducer = (state, action) => {
    // console.log('Reducer Action:', action);
    // console.log('Reducer State Before:', state);

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