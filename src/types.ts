export interface Channel {
	id: number,
	youtubeId: string,
	bilibiliSpaceId?: string,
	name: string,
	description?: string,
	photo?: string,
	publishedAt: Date,
	twitter?: string
	views?: number,
	subscribers?: number,
	videos?: number
}

export interface VideoBase {
	id: number,
	status: 'past' | 'live' | 'upcoming',
	youtubeId?: string,
	bilibiliId?: string,
	title: string,
	thumbnail?: string,
	publishedAt?: Date,
	scheduledDate?: Date,
	startDate?: Date,
	endDate?: Date,
	viewers?: number,
	channel: Channel,
}

export interface EndedLivestream extends VideoBase {
	status: 'past',
	scheduledDate?: Date,
	startDate: Date,
	endDate: Date,
	viewers: undefined,
}

export interface LiveLivestream extends VideoBase {
	status: 'live',
	scheduledDate?: Date,
	startDate: Date,
	endDate: undefined,
}

export interface UpcomingLivestream extends VideoBase {
	status: 'upcoming',
	scheduledDate: Date,
	startDate: undefined,
	endDate: undefined,
	viewers: undefined,
}

export interface LivestreamData {
	live: Array<LiveLivestream>,
	upcoming: Array<UpcomingLivestream>,
	ended: Array<EndedLivestream>,
	cached: boolean
}

export interface ChannelData {
	channels: Array<Channel>,
	total: number,
	count: number
}

export interface Comment {
	id: string,
	message: string
}

export interface Video extends VideoBase {
	isUploaded?: boolean,
	isCaptioned?: boolean,
	durationSecs?: number,
	comments?: Array<Comment>
}

export interface VideoData {
	videos: Array<Video>,
	total: number,
	count: number
}

export interface VideoWithComments extends Video {
	comments: Array<Comment>
}

export interface YoutubeVideo extends Video {
	youtubeId: string,
	bilibiliId: undefined,
	comments?: Array<Comment>
}

export interface BilibiliVideo extends Video {
	youtubeId: undefined,
	bilibiliId: string
}

export interface CommentData {
	data: Array<VideoWithComments>
	count: number,
	cached: boolean,
	query: string
}

export interface Settings {
	/**
	 * The URL of the API
	 */
	url?: string
}

/**
 * @internal
 */
export interface ApiChannel {
	id: number,
	ytChannelId: string,
	bbSpaceId?: string,
	name: string,
	description?: string,
	photo: string,
	publishedAt: string,
	twitterLink: string
	views?: number,
	subscribers?: number,
	videos?: number
}

/**
 * @internal
 */
export interface ApiVideoBase {
	id: number,
	status: 'past' | 'live' | 'upcoming';
	ytVideoKey?: string,
	bbVideoId?: string,
	title: string,
	thumbnail?: string,
	publishedAt?: string,
	liveSchedule?: string,
	liveStart?: string,
	liveEnd?: string,
	liveViewers?: number,
	channel: ApiChannel,
}

/**
 * @internal
 */
export interface ApiLiveLivestream extends ApiVideoBase {
	liveStart: string,
	liveEnd: undefined,
	liveViewers: number
}

/**
 * @internal
 */
export interface ApiUpcomingLivestream extends ApiVideoBase {
	liveSchedule: string,
	liveStart: undefined,
	liveEnd: undefined,
	liveViewers: undefined
}

/**
 * @internal
 */
export interface ApiEndedLivestream extends ApiVideoBase {
	liveStart: string,
	liveEnd: string,
	liveViewers: undefined
}

/**
 * @internal
 */
export interface ApiVideo extends ApiVideoBase {
	durationSecs?: number,
	isUploaded?: number,
	isCaptioned?: number
}

/**
 * @internal
 */
export interface ApiComment {
	commentKey: string,
	message: string
}

/**
 * @internal
 */
export interface ApiVideoWithComments extends ApiVideo {
	comments: Array<ApiComment>
}

/**
 * @internal
 */
export interface ApiBilibiliVideo extends ApiVideo {
	ytVideoKey: undefined,
	bbVideoId: string
}

/**
 * @internal
 */
export interface ApiYoutubeWithComments extends ApiVideoWithComments {
	ytVideoKey: string,
	bbVideoId: undefined
}
