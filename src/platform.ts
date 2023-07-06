export type Seed = [number, number, number, number]

export interface GenArtPlatform {
    isPreview():boolean
    triggerPreview():void
    hash():string
    seed():Seed
    generateHash():void
    width():number
}
