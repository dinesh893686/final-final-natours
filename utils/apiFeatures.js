class apiFeatures {

    constructor(query, query_str) {
        this.query = query;
        this.query_str = query_str;
    }

    //filter
    filter() {

        const query_obj = { ...this.query_str }
        console.log(query_obj)
        const excluded_query = ['page', 'sort', 'limit', 'fields']
        excluded_query.forEach((el) => {
            delete query_obj[el]

        })

        let query_str = JSON.stringify(query_obj)

        query_str = query_str.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`
        )

        this.query = this.query.find(JSON.parse(query_str))


        return this;
    }

    //sort
    sort() {
        if (this.query_str.sort) {
            let sortBy = this.query_str.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)

        }
        return this;
    }
    //fields
    limitFields() {
        if (this.query_str.fields) {
            let limitBy = this.query_str.fields.split(',').join(' ')
            this.query = this.query.select(limitBy)
        }
        else {
            this.query = this.query.select('-__v')
        }
        return this
    }

    // pagination

    pagination() {

        const page = this.query_str.page * 1 || 1
        const limit = this.query_str.limit * 1 || 100
        const skip_page = (page - 1) * limit


        this.query = this.query.skip(skip_page).limit(limit)



        return this
    }


}


module.exports = apiFeatures