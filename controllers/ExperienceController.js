const { errorResponseMessage, successResponseMessage, paginationResponseMessage } = require("../helper/responseMessage");
const { getUserAttendance, getAllAttendance } = require("../services/attendanceServices");
const { totalCountries } = require("../services/countryServices");
const { createExperience } = require("../services/ExperienceServices");
const { createSubCategory, getAllSubCategory, totalSubCategories } = require("../services/subCategoryServices");

const create = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const userId = req.user.id;
        if (!name) {
            return errorResponseMessage(res, req.translate('sub_category.name_required'));
        }
        if (!categoryId) {
            return errorResponseMessage(res, req.translate('sub_category.category_id_required'));
        }
        if (name.length < 3) {
            return errorResponseMessage(res, req.translate('sub_category.category_name_min_length'));
        }
        const experience = await createExperience({
            user: userId,
            title,
            employmentType,
            company,
            location,
            LocationType,
            isWorking,
            fromMonth,
            fromYear,
            toMonth,
            toYear,
            skills,
            description,
            document: null
        })
        return successResponseMessage(res, req.translate('sub_category.add'), experience)
    } catch (error) {
        // Dynamic error message key based on error type
        const errorMessageKey = `comman_error.${error.name.toLowerCase()}`;
        const errorMessage = req.translate(errorMessageKey, { error: error.message });
        return errorResponseMessage(res, error.message);
    }
}

const list = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 5;
    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalSubCategories();
        const subCategories = await getAllSubCategory(skip, pageSize);

        return paginationResponseMessage(res, {
            message: req.translate('sub_category.list'),
            status: true,
            data: subCategories,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        })
    } catch (err) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const update = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalCountries();
        const countries = await getUserAttendance(skip, pageSize);
        res.json({
            countries,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "Get all countries!"
        });
    } catch (err) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const destroy = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const skip = (page - 1) * pageSize;
    try {
        const totalItems = await totalCountries();
        const countries = await getAllAttendance(skip, pageSize);
        res.json({
            countries,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "Get all countries!"
        });
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = {
    create, list,
    update, destroy,
    find
}  