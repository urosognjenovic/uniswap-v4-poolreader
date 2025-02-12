// Convert fee to percent (i.e. if fee = 500, the function returns "0.05%")
export const convertFeeToPercent = (fee) => {
    return ( fee / 10_000 + "%");
}