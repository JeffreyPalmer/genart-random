// genart-random - packaged random number routines for use in generative art projects
//
// This is a simple wrapper over a bunch of thi.ng functions so I don't accidentally forget to pass the RNG
//
import type { Fn0 } from '@thi.ng/api'
import * as thingRandom from '@thi.ng/random'
import * as thingArrays from '@thi.ng/arrays'
import * as simplexNoise from 'simplex-noise'

// This needs to be parameterized by the GenArtPlatform

export interface ResettableRandom extends thingRandom.IRandom {
    reset():void
}

var RNG: ResettableRandom

export function initialize(rng:ResettableRandom) {
    RNG = rng
}

// Escape hatch to allow the RNG to be passed to other functions not yet wrapped by this library
export function rng() {
    return RNG
}

export function reset() {
    // RNG = new thingRandom.SFC32(SEED)
    RNG.reset()
}

export function float(max: number = 1.0) {
    return RNG.float(max)
}

export function int() {
    return RNG.int()
}

export function minmax(min: number, max: number) {
    return RNG.minmax(min, max)
}

export function minmaxInt(min: number, max: number) {
    return RNG.minmaxInt(min, max)
}

// values in [-scale..scale]
export function norm(scale: number = 1) {
    return RNG.norm(scale)
}

// values in [min..max) or (-max..min]
export function normMinMax(min: number, max: number) {
    return RNG.normMinMax(min, max)
}

export function probability(p:number) {
    return RNG.probability(p)
}

export function fairCoin() {
    return thingRandom.fairCoin(RNG)
}

export function normal(bias: number = 0, sigma: number = 1) {
    return thingRandom.normal(RNG, bias, sigma)
}

export function gaussian(n: number = 24, offset: number = 0, scale: number = 1) {
    return thingRandom.gaussian(RNG, n, offset, scale)
}

export function exponential(lambda: number = 10) {
    return thingRandom.exponential(RNG, lambda)
}

export function shuffle<T extends any[]>(buf: T, n = buf.length) {
    return thingArrays.shuffle(buf, n, RNG)
}

export function shuffleRange<T extends any[]>(buf: T, start?: number, end?: number): T {
    return thingArrays.shuffleRange(buf, start, end, RNG)
}

export function pickRandom<T>(src: ArrayLike<T>, start: number = 0, end: number = src.length): T {
    return thingRandom.pickRandom<T>(src, RNG, start, end)
}

export function pickRandomKey<T extends object>(obj: T): keyof T {
    return thingRandom.pickRandomKey(obj, RNG)
}

export function weightedRandom<T>(choices: T[], weights?: ArrayLike<number>) {
    return thingRandom.weightedRandom<T>(choices, weights, RNG)
}

export function weightedRandomKey<T extends Record<string, number>>(choices: T): Fn0<keyof T> {
    return thingRandom.weightedRandomKey(choices, RNG)
}

export function createNoise2D() {
    return simplexNoise.createNoise2D(float)
}

export function createNoise3D() {
    return simplexNoise.createNoise3D(float)
}

export function createNoise4D() {
    return simplexNoise.createNoise4D(float)
}
