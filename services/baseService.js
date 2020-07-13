class BaseService {
    constructor(model) {
        this.model = model;
    }
    prettifyError = (error) => {
        return error.message; //should be extended later.
    };
    create = async (body) => {
        try {
            const obj = await this.model.create(body);
            return obj.toJSON();
        } catch (error) {
            throw new Error(this.prettifyError(error));
        }
    };
    findOne = async (query) => {
        try {
            const obj = await this.model.findOne({
                where: {
                    ...query,
                },
            });
            return obj.toJSON();
        } catch (error) {
            throw new Error(this.prettifyError(error));
        }
    };
    update = async (updatedBody) => {};
}

module.exports = { BaseService };
