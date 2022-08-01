export class Format {

    // Converte o ID dos elementos para Camel-Case
    static getgetCamelCase(text) {

        let div = document.createElement("div");

        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];

    }

    /*
        Formata o Timer da gravação de Áudio
        padStart() - Preenche a String com um determinado caractere
    */
    static toTime(duration) {

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            
        } else {
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;

        }

    }

    // Faz a formatação da hora das mensagens
    static dateToTime(date, locale = 'pt-BR') {

        return date.toLocaleTimeString(locale, {
            hours: '2-digit',
            minutes: '2-digit'
        })

    }

    // Verifica se existe um timeStamp e se há uma função nele
    static timeStampToTime(timeStamp) {

        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';

    }

}