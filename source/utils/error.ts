/** Errors thrown by kanaphig library */
export default class KanaphigError extends Error {
  public readonly name: string;
  public readonly description: string;
  public readonly additionalProperties: Record<string, unknown>;

  /**
   * Create new kanaphig error
   * @param description - Description of the error
   * @param additionalProperties - Additional properties
   */
  constructor(
    description: string,
    additionalProperties: Record<string, unknown>
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = "KanaphigError";
    this.description = description;
    this.additionalProperties = additionalProperties;

    Error.captureStackTrace(this);
  }
}
