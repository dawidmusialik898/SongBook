export * from './simpleSong.service';
import { SimpleSongService } from './simpleSong.service';
export * from './structuredSong.service';
import { StructuredSongService } from './structuredSong.service';
export const APIS = [SimpleSongService, StructuredSongService];
