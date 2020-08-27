// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      // determine whether a specific row has more than one piece on it, causing a conflict
      // declare counter
      var count = 0;
      // access current row, store in var
      var row = this.rows()[rowIndex];
      // iterate through row array
      for (var i = 0; i < row.length; i++) {
        // check if more than one piece in current row
        // increment a count var by val at current index of current row
        count += row[i];
        // if count > 1,
        if (count > 1) {
          // return true (break loop)
          return true;
        }
      }
      // else, return false
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // call hasRowConflictAt on every row
      var numRows = this.get('n');

      // use boolean flag set to false for now
      // iterate over numRows
      // if hasRowConflict(i), boolean flag reassigned to true
      // return boolean flag

      for (var i = 0; i < numRows; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // displayBoard([
    //   [0, 1, 0, 0], -> 0
    //   [0, 0, 0, 1], -> 1
    //   [1, 0, 0, 0], -> 2
    //   [0, 0, 1, 0]  -> 3
    // ]);

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // colIndex = same index applied to all row arrays
      // go down every column and see if there is more than one piece in that column
      var numRows = this.get('n');
      // var count = 0
      var count = 0;
      // iterate over this.rows(), looking at colIndex for each
      for (var i = 0; i < numRows; i++) {
        // increment count by value at colIndex
        var row = this.rows()[i];
        count += row[colIndex];
        // if count > 1,
        if (count > 1) {
        // return true
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      // checking for column conflicts on all columns
      // declare numCols
      // iterate over every column
      // call hasColConflictAt on each column index
      // if hasColConflictAt evaluates to true
      // return true

      // in every other case, return false

      var numCols = this.get('n');

      for (var i = 0; i < numCols; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // Major Diagonals:
    // row + 1, col + 1 (within n)
    // row - 1, col - 1 (within n)

    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      // majorDiagonalColumnIndexAtFirstRow = colIndex - rowIndex (maybe?)

      // declare dimension set equal to n
      var dimension = this.get('n');
      // declare count set equal to 0
      var count = 0;

      // for top three diagonals
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        // row + 1, col + 1 to set diagonal path, iterate
        for (var row = 0, col = majorDiagonalColumnIndexAtFirstRow; row < dimension && col < dimension; row++, col++) {
          count += this.rows()[row][col];
          if (count > 1) {
            // if count > 1, return true
            return true;
          }
        }
      // for bottom two diagonals
      } else {
        for (var col = 0, row = Math.abs(majorDiagonalColumnIndexAtFirstRow); row < dimension && col < dimension; row++, col++) {
          count += this.rows()[row][col];
          if (count > 1) {
            // if count > 1, return true
            return true;
          }
        }
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      var dimension = this.get('n');
      for (var i = 2 - dimension; i < dimension - 2; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // declare dimension, equal to n (get n the same way we have before)
      // run a for loop, iterating through every number from 2 - n to n - 2
      // if this.hasMajorDiagonalConflictAt(iteration)
      // return true

      // otherwise,
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    // Minor Diagonals:
    // row + 1, col - 1 (within n)
    // row - 1, col + 1 (within n)

    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      var dimension = this.get('n');
      // declare count set equal to 0
      var count = 0;

      // for top three diagonals
      if (minorDiagonalColumnIndexAtFirstRow < dimension) {
        // row + 1, col + 1 to set diagonal path, iterate
        for (var row = 0, col = minorDiagonalColumnIndexAtFirstRow; row < dimension && col < dimension; row++, col--) {
          count += this.rows()[row][col];
          if (count > 1) {
            // if count > 1, return true
            return true;
          }
        }
      // for bottom two diagonals
      } else {
        for (var row = minorDiagonalColumnIndexAtFirstRow - dimension + 1, col = dimension - 1; row < dimension && col < dimension; row++, col--) {
          count += this.rows()[row][col];
          if (count > 1) {
            // if count > 1, return true
            return true;
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      // get n
      var dimension = this.get('n');
      for (var i = 0; i < 2 * (dimension - 1); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
