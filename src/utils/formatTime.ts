
export const formatTime = (time: number): string => {
    const totalHours = Math.floor(time / 3600000); 
    const totalMinutes = Math.floor(time / 60000);
    const totalSeconds = Math.floor((time % 60000) / 1000);
    
    return `${totalHours}h ${totalMinutes}m ${totalSeconds}s`;
};