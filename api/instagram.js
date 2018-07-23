'use strict';

const API = 'https://i.instagram.com/api/v1/'
const WEB_API = 'https://www.instagram.com/web/'


module.exports = class Instagram {
    contructor(endpoint) {
        this.endpoint = endpoint // e.g. liked
        this.action = endpoint.slice(0, -1) // e.g. like
        this.uid = UID
        this.uuid = UUID

        this.firstNextMaxId = undefined
        this.firstRun = true

        this.nextMaxId = null
        this.items = []

        this.start = this.start.bind(this)
        this.fetch = this.fetch.bind(this)
        this.storeNext = this.storeNext.bind(this)
        this.normalize = this.normalize.bind(this)
        this.storeData = this.storeData.bind(this)
    }

    start() {
        if (this.firstNextMaxId === undefined) {
            // request get
            // return window.IG_Storage.get(this.endpoint, { items: [], nextMaxId: '' }).then(data => {
            return request(this.endpoint, {items: [], nextMaxId: ''}).then(data => {
                this.firstNextMaxId = data.nextMaxId
                this.items = data.items
                return data
            })
        }
        return Promise.resolve(this.items)
    }

    fetch() {
        if (this.nextMaxId === '') return Promise.resolve(this.items) // nothing more to fetch

        return fetch(`${API}feed/${this.endpoint}/?${this.nextMaxId ? `max_id=${this.nextMaxId}&` : ''}`) // maxId means "show everything before X"
            .then(this.storeNext)
            .then(this.normalize)
            .then(this.storeData)
    }

    storeNext(data) {
        console.log(data)
        this.nextMaxId = data.next_max_id !== undefined ? `${data.next_max_id}` : ''

        return data
    }

    normalize(data) {
        if (data.items !== undefined && data.items.length && data.items[0].media !== undefined) {
            // we need to normalize "saved"
            data.items = data.items.map(item => item.media)
        }
        return data
    }

    /**
     * Compare the first `len` elements of the old item data set with the new data set
     * To do this, we compare the last elem's id of the new data set with `len` elems of the old.
     *
     * @param 	{Object} 	data
     * @return 	{Boolean} Whether the function found a matching item or not
     */
    compareData(data) {
        if (data.items === undefined || !data.items.length) return true // prevent adding undefined or similar

        const items = data.items,
            len = items.length,
            lastId = items[len - 1].id,
            maxLen = Math.min(len, this.items.length) // don't exceed either array len
        let match = false
        for (let i = 0; i < maxLen; ++i) {
            if (lastId === this.items[i].id) {
                // next elements are older
                match = true
                items.push(...this.items.slice(i + 1))
                this.items = items
                break
            }
        }

        return match
    }
};