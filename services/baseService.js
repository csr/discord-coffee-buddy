class BaseService {
    constructor(model) {
        this.model = model;
    }
    prettifyError = (error) => {
        return error; //should be extended later.
    };
    create = async (body) => {
        try {
            const obj = await this.model.create(body);
            return obj.toJSON();
        } catch (error) {
            throw new Error(this.prettifyError(error));
        }
    };
    findAll = async (query, attributes) => {
        try {
            const result = await this.model.findAll({
                where: query,
                raw: true,
                attributes,
            });
            return result;
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
            if (obj == null) {
                throw new Error('Not found');
            }
            return obj.toJSON();
        } catch (error) {
            throw new Error(this.prettifyError(error));
        }
    };
    update = async (updatedBody, query) => {
        const res = await this.model.update(updatedBody, { where: query });
        return res;
    };
}

module.exports = { BaseService };
