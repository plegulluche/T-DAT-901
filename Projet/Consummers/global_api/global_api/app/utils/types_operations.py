def parse_float(value: str) -> float:
    try:
        # Remove currency symbols and commas, then convert to float
        return float(value.replace("Ƀ", "").replace(",", "").replace("$", "").strip())
    except ValueError:
        # Handle or log the error as appropriate
        return 0.0