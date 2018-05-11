/**
 * Shell patterns
 *
 * @author Matthew King
 * @author Craig Campbell
 */
Rainbow.extend('cpp', [
    /**
     * This handles the case where subshells contain quotes.
     * For example: `"$(resolve_link "$name" || true)"`.
     *
     * Caveat: This really should match balanced parentheses, but cannot.
     * @see http://stackoverflow.com/questions/133601/can-regular-expressions-be-used-to-match-nested-patterns
     */
    {
        name: 'cpp',
        matches: {
            1: {
                language: 'cpp'
            }
        },
        pattern: /\$\(([\s\S]*?)\)/gm
    },
    {
        matches: {
            2: 'string'
        },
        pattern: /(\(|\s|\[|\=)(('|")[\s\S]*?(\3))/gm
    },
    {
        name: 'constant.symbol',
        pattern: /@[a-zA-Z0-9_]+/g
    },
    {
        name: 'comment',
        pattern: /\/\/[\s\S]*?$/gm
    },
    {
        matches: {
            1: 'keyword'
        },
        pattern: /\b(class|struct)(?=\b)/g
    }
]);