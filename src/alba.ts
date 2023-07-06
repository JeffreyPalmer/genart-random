// Alba platform abstraction
import type { Seed } from './platform.js'
import { GenArtPlatform } from './platform.js'
import { albaSnippet } from './alba-snippet.js'

type Alba = typeof window & {
    alba: {
        params: {
            seed: string;
            tokenId: number;
            width?: number;
        };
        isComplete: () => boolean;
        setComplete: (a: boolean) => void;
        getMetadata: () => Record<string, any>;
        setMetadata: (a: Record<string, any>) => void;
        prng: (seed: string) => () => number;
        _testSeed: () => string;
    };
};

const alba = (window as Alba).alba ?? albaSnippet()

class AlbaImpl implements GenArtPlatform {
    private _hash: string
    private _seed: Seed
    private _pixelRatio: number

    constructor() {
        console.trace()

        // This is a bad idea TM
        const hash = alba.params.seed ?? alba._testSeed()
        this._hash = hash
        this._seed = AlbaImpl.generateSeed(hash)
        this._pixelRatio = window.devicePixelRatio ?? 2
    }

    hash(): string {
        return this._hash
    }

    seed(): Seed {
        return this._seed
    }

    isPreview(): boolean {
        // Alba doesn't currently have a way to determine if this is a preview render, so always assume it is
        return true
    }

    triggerPreview(): void {
        alba.setComplete(true)
    }

    generateHash() {
        this._hash = alba._testSeed()
        this._seed = AlbaImpl.generateSeed(this._hash)
    }

    width() {
        return alba.params.width ?? window.innerWidth * this._pixelRatio
    }

    // Generate an RNG seed from the hash string
    private static generateSeed(hash: string): Seed {
        const [_, seedHex] = hash.split("x")
        return [...Array(4).keys()].map( (i) => parseInt(seedHex.slice(i * 8, (i+1) * 8), 16)) as Seed
    }
}

export const Alba: GenArtPlatform = new AlbaImpl()
