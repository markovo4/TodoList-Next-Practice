export const truncate = (value?: string | undefined): string => {
    const firstEight = value?.slice(0,8)
    const lastEight = value?.slice(value?.length - 8,value?.length)
    return `${firstEight}...${lastEight}`
}