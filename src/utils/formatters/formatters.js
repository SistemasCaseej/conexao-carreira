export const formatCurrency = (val) => {
    if (!val) return "";
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(val / 100);
};