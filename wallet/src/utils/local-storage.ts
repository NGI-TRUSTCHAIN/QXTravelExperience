function exists(key: string): boolean {
    return localStorage.getItem(key) !== null ? true : false;
}

function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key: string): void {
    localStorage.removeItem(key);
}

function removeAll(): void {
    localStorage.clear();
}

const localStorageHelper = {
    exists,
    getItem,
    setItem,
    removeItem,
    removeAll,
}

export default localStorageHelper;