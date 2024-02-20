import { decimal, uuid } from "../miscellaneous/system.types";

export interface  LlmPromptsDto {
    id                : uuid,
    Name              : string,
    Description       : string,
    UseCaseType       : string[],
    ModelName         : string,
    ModelVersion      : string,
    UserId            : string,
    Temperature       :decimal,
    FrequencyPenality : decimal,
    TopP              :decimal,
    PresencePenalty   :decimal,
    IsActive          :boolean
}
