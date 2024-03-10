const getDate = () => {
    var date = new Date();
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const formatDate = (date) => {
        let formatted_date = date.getDate() + " de " + months[date.getMonth()] + " del " + date.getFullYear()
        return formatted_date;
    }
    let fecha = formatDate(date)
    return fecha;
}

const getDateByYear = (fecha) => {
    const date = new Date(fecha);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = [day, month, year];
    return currentDate;
}

const getMonth = (dat) => {
    var date = new Date(dat);
    const formatDate = (date) => {
        let mes = date.getMonth() + 1
        return  [date.getFullYear(), mes]
    }
    let fecha = formatDate(date)
    return fecha;
}

const getDays = (dat) => {
    function getFormattedDate(today) {
        var week = new Array('Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado');
        var day = week[today.getDay()];
        return day
    }
    var date = new Date(dat);
    var text = getFormattedDate(date);
    return text
}

const getDaysOfMonth3 = (dat) => {
    var mos=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

    for (i = 0; i < 12; i++) {
        var lastDate = new Date(2012, i+1, 0);
        return mos[i] + ' is ' + lastDate.getDate()
    }
}
const getDaysOfMonth = (dat) => {
    function getFormattedDate(today) {
        var week = new Array('ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic');
        var day = week[today.getMonth()] + ' '+ today.getDate();
        return day
    }
    var date = new Date(dat);
    var text = getFormattedDate(date);
    return text
}

const getOnlyMonth = (dat) => {
    function getFormattedDate(today) {
        var week = new Array('ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic');
        var day = week[today.getMonth()];
        return day
    }
    var date = new Date(dat);
    var text = getFormattedDate(date);
    return text
}

export default { getDate, getDateByYear, getDays, getMonth, getDaysOfMonth, getOnlyMonth}