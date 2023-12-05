/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { addProblemRequest } from '../models/addProblemRequest';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_Page_problem_ } from '../models/BaseResponse_Page_problem_';
import type { GetProblemRequest } from '../models/GetProblemRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProblemControllerService {

    /**
     * addProblem
     * @param addProblemRequest addProblemRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addProblemUsingPost(
addProblemRequest: addProblemRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/problem/add',
            body: addProblemRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getProblem
     * @param getProblemRequest getProblemRequest
     * @returns BaseResponse_Page_problem_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getProblemUsingPost(
getProblemRequest: GetProblemRequest,
): CancelablePromise<BaseResponse_Page_problem_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/problem/get',
            body: getProblemRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
