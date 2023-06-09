import { describe, test, expect} from "vitest";
import {parseFrontEnd} from "./postTest";


describe("postRoute", () => {
    test("Parse Front End Data", () => {
        const post = ({username: "test", email: "test@test.com", comment:"test"});
        expect(parseFrontEnd(post)).toEqual(post);
        expect(parseFrontEnd()).toBeNull();
        expect(parseFrontEnd(123)).toBeNull();
    });
})