#!/usr/bin/python3

import curses

def check_color_support():
  """Checks if the terminal supports 256 colors using curses."""
  try:
    stdscr = curses.initscr()  # Initialize curses screen
    curses.setupterm()        # Set terminal type
    num_colors = curses.tigetnum("colors")  # Get number of colors
    curses.endwin()          # End curses screen
    return num_colors >= 256
  except curses.error:
    # Curses initialization or function call might fail
    return False

if __name__ == "__main__":
  if check_color_support():
    print("TRUE")
  else:
    print("FALSE")
