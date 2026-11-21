import type { PartItem } from '../types/hardware'

export const components: PartItem[] = [
    {
        id: 'cpu-1',
        name: 'AMD Ryzen 7 7800X3D',
        category: 'CPU',
        price: 364.89,
        description: 'A high performance gaming processor.',
        stock: 12,
        specs: {
            cores: '8',
            threads: '16',
            socket: 'AM5'
        }
    }
]

// TODO add remaining components. 
// See pc-parts-page/script.js for reference.