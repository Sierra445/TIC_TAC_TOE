def display_board(board):
    print("Current board:")
    for row in board:
        print("|".join(row))
        print("-" * 5)

def check_winner(board):
    # Check rows
    for row in board:
        if row[0] == row[1] == row[2] and row[0] != ' ':
            return row[0]
    # Check columns
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] != ' ':
            return board[0][col]
    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] != ' ':
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] != ' ':
        return board[0][2]
    return None

def check_draw(board):
    for row in board:
        if ' ' in row:
            return False
    return True

def get_move(player, board):
    while True:
        try:
            move = input(f"{player}, enter your move as row and column (e.g., 1 2): ")
            row_str, col_str = move.strip().split()
            row, col = int(row_str) - 1, int(col_str) - 1
            if row not in range(3) or col not in range(3):
                print("Invalid position. Try again.")
                continue
            if board[row][col] != ' ':
                print("Cell already taken. Try again.")
                continue
            return row, col
        except ValueError:
            print("Invalid input. Enter row and column numbers separated by space.")

def play_game():
    # Initialize empty board
    board = [[' ' for _ in range(3)] for _ in range(3)]
    current_player = 'X'

    while True:
        display_board(board)
        row, col = get_move(current_player, board)
        board[row][col] = current_player

        winner = check_winner(board)
        if winner:
            display_board(board)
            print(f"Congratulations! Player {winner} wins!")
            break

        if check_draw(board):
            display_board(board)
            print("It's a draw!")
            break

        # Switch players
        current_player = 'O' if current_player == 'X' else 'X'

# Start the game
play_game()