const session = {
    methods: {
        get_session(key) {
            const value = localStorage.getItem(key);
            if (value) {
                try {
                    // Tenta decodificar a string em base64
                    return atob(value);
                } catch (error) {
                    console.error('Erro ao decodificar a string de base64:', error);
                    return null;
                }
            }
            return null;
        },
        set_session(key, val) {
            try {
                // Codifica o valor em base64
                const encodedValue = btoa(val);
                localStorage.setItem(key, encodedValue);
            } catch (error) {
                console.error('Erro ao codificar a string em base64:', error);
            }
        },
        clear_storage() {
            localStorage.clear();
        },
        get_all_sessions() {
            const allSessions = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                try {
                    allSessions[key] = value ? atob(value) : null;
                } catch (error) {
                    console.error(`Erro ao decodificar o item "${key}":`, error);
                    allSessions[key] = null; // Define como nulo se não puder ser decodificado
                }
            }
            return allSessions;
        }
    }
};

export default session;
